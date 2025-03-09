import $ from 'jquery';

$('#chk-mode').on('change', function() {
    const darkMode = $(this).prop('checked');

    $('html').attr('data-bs-theme', darkMode ? 'dark' : 'light');
});
