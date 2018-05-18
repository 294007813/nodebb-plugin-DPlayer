"use strict";

$(document).ready(function() {
	var VideoExtendedMarkdown = {};

	$('[data-toggle="tooltip"]').tooltip();

	$(window).on('action:ajaxify.end', function(ev, data) {
		$('[data-toggle="tooltip"]').tooltip();

	});

	$(window).on('action:topic.loaded', function(ev, data) {
		require(['DPlayer'], function (DPlayer) {
			$(".dplayer-block").each(function (index,element) {
				var address=''
				if($(element).children("a").length>0){
					address = $(element).children("a").attr("href")
					console.log(address)
					var video= new DPlayer({
						container: element,
						video: {
							url: address,
						},
					});
					document.addEventListener("clickPlay",function(e){
						if(video.video.src.indexOf('/login')>=0){
							window.location.href='/login'
						}
					})
				}

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
					formatting.addButtonDispatch('video', function(textarea, selectionStart, selectionEnd) {
						if (selectionStart === selectionEnd) {
							controls.insertIntoTextarea(textarea, '!(' + strings.video_text + ')');
							controls.updateTextareaSelection(textarea, selectionStart + 2, selectionStart + 2 + strings.video_text.length);
						} else {
							var wrapDelta = controls.wrapSelectionInTextareaWith(textarea, '!(', ')');
							controls.updateTextareaSelection(textarea, selectionStart + 2, selectionEnd + 2);
						}
					});
				})
			}
		})
	}
})
