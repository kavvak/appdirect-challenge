(function(module) {
	'use strict';
	module.controller('tweetCardController', function() {
		var self = this;
		self.isRetweeted = isRetweeted;

		bootstrap();

		function bootstrap() {
			formatText();
			formatProfileUrl();
			formatTweetDate();
			formatTweetLink();
		}

		function formatTweetLink() {
			self.tweetLink = 'https://twitter.com/' + self.tweet.user.screen_name + '/status/' + self.tweet.id_str;
		}

		function formatText() {
			self.formattedText = '';
			var index = 0;

			if (self.isRetweeted() && self.tweet.text.indexOf('RT ') === 0) {
				index = 3;
			}

			var entries = [];
			_.each(self.tweet.entities.user_mentions, function(userEntry) {
				var entry = _.extend(userEntry, {startIndex: userEntry.indices[0], type: 'USER'});
				entries.push(entry);
			});
			_.each(self.tweet.entities.hashtags, function(hashtagEntry) {
				var entry = _.extend(hashtagEntry, {startIndex: hashtagEntry.indices[0], type: 'HASHTAG'});
				entries.push(entry);
			});
			_.each(self.tweet.entities.urls, function(urlEntry) {
				var entry = _.extend(urlEntry, {startIndex: urlEntry.indices[0], type: 'URL'});
				entries.push(entry);
			});

			entries = _.sortBy(entries, 'startIndex');

			_.each(entries, function(entry) {
				var entryHtml;
				var endIndex;

				if (entry.type === 'USER') {
					endIndex = self.tweet.text.indexOf('@', index);
					entryHtml = generateUserLink(entry);
			 	}
				if (entry.type === 'HASHTAG') {
					endIndex = self.tweet.text.indexOf('#', index);
					entryHtml = generateHashtagLink(entry);
			 	}
				if (entry.type === 'URL') {
					endIndex = self.tweet.text.indexOf('http', index);
					entryHtml = generateUrlLink(entry);
			 	}

				endIndex = Math.min(entry.indices[0], endIndex);
				self.formattedText = self.formattedText +
					self.tweet.text.substr(index, endIndex - index) +
					entryHtml;

				index = entry.indices[1];
			}.bind(self));

			var lastIndex = self.tweet.text.indexOf('http', index);
			lastIndex = lastIndex >= 0 ? lastIndex : self.tweet.text.length;
			self.formattedText = self.formattedText + self.tweet.text.substr(index, lastIndex - index);
		}

		function generateUserLink(userEntry) {
			return '<a href="' + getUserUrl(userEntry) + '" target="_blank">@' + userEntry.screen_name + '</a>';
		}

		function generateHashtagLink(hashtagEntry) {
			return '<a href="https://twitter.com/hashtag/' +
							hashtagEntry.text +
							'" target="_blank">#' +
							hashtagEntry.text +
							'</a>';
		}

		function generateUrlLink(urlEntry) {
			return '<a href="' + urlEntry.url + '" target="_blank">' + urlEntry.display_url + '</a>';
		}

		function getUserUrl(user) {
			return 'https://twitter.com/' + user.screen_name;
		}

		function formatProfileUrl() {
			self.profileImageTag = '<img src="' + self.tweet.user.profile_image_url_https + '"/>';
			self.userUrl = getUserUrl(self.tweet.user);
		}

		function formatTweetDate() {
			var date = moment(new Date(self.tweet.created_at));
			self.formattedDate = date.format('HH:mm LL');
		}

		function isRetweeted() {
			return !!self.tweet.retweeted_status;
		}
	});
})(angular.module('appdirect'));
