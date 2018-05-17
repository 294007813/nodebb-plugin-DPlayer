"use strict";

$(document).ready(function() {
	var VideoExtendedMarkdown = {};

	$('[data-toggle="tooltip"]').tooltip();

	$(window).on('action:ajaxify.end', function(ev, data) {
		$('[data-toggle="tooltip"]').tooltip();

		require(['DPlayer'], function (DPlayer) {
			$(".dplayer-block").each(function (index,element) {
				new DPlayer({
					container: element,
					video: {
						url: $(element).children("a").attr("href"),
					},
				});
			})
		});
	});

	$(window).on('action:composer.enhanced', function(evt, data) {
		VideoExtendedMarkdown.prepareFormattingTools();
	});





	VideoExtendedMarkdown.prepareFormattingTools = function() {
		require([
			'composer/formatting',
			'composer/controls',
			'translator',
		], function (formatting, controls, translator) {
			if (formatting && controls) {
				// params is (language, namespace, callback)
				translator.getTranslations(window.config.userLang || window.config.defaultLang, 'videoextendedmarkdown', function(strings) {
					formatting.addButtonDispatch('center', function(textarea, selectionStart, selectionEnd) {
						if (selectionStart === selectionEnd) {
							controls.insertIntoTextarea(textarea, '!(' + strings.video + ')');
							controls.updateTextareaSelection(textarea, selectionStart + 2, selectionStart + 2 + strings.video.length);
						} else {
							var wrapDelta = controls.wrapSelectionInTextareaWith(textarea, '!(', ')');
							controls.updateTextareaSelection(textarea, selectionStart + 2, selectionEnd + 1);
						}
					});
				})
			}
		})
	}
})
