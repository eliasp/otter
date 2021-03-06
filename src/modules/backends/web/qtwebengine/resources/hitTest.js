var element = ((%1 >= 0) ? document.elementFromPoint((%1 + window.scrollX), (%2 + window.scrollX)) : document.activeElement);
var result = {
	alternateText: '',
	formUrl: '',
	frameUrl: '',
	geometry: { x: 0, y: 0, w: 0, h: 0 },
	hasControls: false,
	imageUrl: '',
	isContentEditable: false,
	isLooped : false,
	isMuted: false,
	isPaused: false,
	linkUrl: '',
	longDescription: '',
	mediaUrl: '',
	tagName: '',
	title: ''
};

if (element)
{
	var geometry = element.getBoundingClientRect();

	result.geometry = { x: geometry.top, y: geometry.left, w: geometry.width, h: geometry.height };
	result.isContentEditable = element.isContentEditable;
	result.tagName = element.tagName.toLowerCase();

	if (result.tagName == 'iframe' || result.tagName == 'frame')
	{
		var link = document.createElement('a');
		link.href = element.src;

		result.frameUrl = link.href;
	}

	if (result.tagName == 'img')
	{
		var link = document.createElement('a');
		link.href = element.src;

		result.alternateText = element.alt;
		result.imageUrl = link.href;
		result.longDescription = element.longDesc;
	}

	if (result.tagName == 'audio' || result.tagName == 'video')
	{
		var link = document.createElement('a');
		link.href = element.src;

		result.hasControls = element.controls;
		result.isLooped = element.looped;
		result.isMuted = element.muted;
		result.isPaused = element.paused;
		result.mediaUrl = link.href;
	}

	var isForm = ((result.tagName == 'input'|| result.tagName == 'button') && (element.getAttribute('type').toLowerCase() == 'submit' || element.getAttribute('type').toLowerCase() == 'image'))

		while (element && ((isForm && result.formUrl == '') || result.linkUrl == '' || result.title == ''))
	{
		if (element.title !== '')
		{
			result.title = element.title;
		}

		if (element.tagName)
		{
			if (element.tagName.toLowerCase() == 'a')
			{
				result.linkUrl = element.href;
			}
			else if (isForm && result.formUrl == '' && element.tagName.toLowerCase() == 'form')
			{
				var link = document.createElement('a');
				link.href = element.action;

				result.formUrl = link.href;
			}
		}

		element = element.parentNode;
	}
}

result;
