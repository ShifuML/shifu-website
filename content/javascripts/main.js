var versions = ['0.3.x-snapshot', '0.2.x']

$(document).ready(function() {


    var current_version = window.location.pathname.split('/')[3];

    if (current_version == 'stable') {
        current_version = versions[1];
    }

    if (current_version == 'snapshot') {
        current_version = versions[0];
    }

    versions.forEach(function(version) {
        $('#shifu-core-version').append('<option>' + version + '</option>')
        
    })
    $('#shifu-core-version').val(current_version);
    $('#shifu-core-version').change(function() {window.location.href='/docs/shifu-core/' + $(this).val()})

    $('#guide-version').val(current_version);
    $('#guide-version').change(function() {window.location.href='/docs/shifu-core/' + $(this).val() + '/guide/main'})

    windowResize();
    $(window).resize(windowResize);
})

function windowResize() {
    $('#branding-container').height(Math.min(700,Math.max($(window).height() - 50 - $('#white-band').height() - 60, $('#branding-container-content').height() + 120)));
    var margin = ($('#branding-container').height() - $('#branding-container-content').height()) * 0.4;
    $('#branding-container-content').css('padding-top', margin)
}

function roadsignMouseOver() {
	$('#roadsignclose').css('visibility','visible');
}

function roadsignMouseOut() {
	$('#roadsignclose').css('visibility','hidden');
}

function roadsignCloseMouseOver() {
	$('#roadsignclose').css('visibility','visible');
}

function roadsignClick() {
	$('#roadsign').css('visibility','hidden');
	$('#roadsignclose').css('visibility','hidden');
}
