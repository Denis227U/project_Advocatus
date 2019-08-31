window.onload = function () {

    var preloader = document.getElementById('page-preloader');
    setTimeout(function () {
        if (!preloader.classList.contains('done')) {
            preloader.classList.add('done');
        }
        setTimeout(function () {
            preloader.style.display = 'none';
        }, 700)
    }, 700)
}﻿
