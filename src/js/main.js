import $ from 'jquery';

/* Dark mode or light mode */
const darkMode = matchMedia('(prefers-color-scheme: dark)').matches
$('html').attr('data-bs-theme', darkMode ? 'dark' : 'light');
$('#chk-mode').prop('checked', darkMode);