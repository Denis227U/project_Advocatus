// Слик слайдер
$(document).ready(function () {
    $('.ourClientsSlider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true, // false
        autoplay: true,
        autoplaySpeed: 2000
    });
});

// Acc PC
$(document).on("click", ".naccs .menu div", function () {
    let numberIndex = $(this).index();

    if (!$(this).is("active")) {
        $(".naccs .menu div").removeClass("active");
        $(".naccs ul li").removeClass("active");

        $(this).addClass("active");
        $(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");

        let listItemHeight = $(".naccs ul")
            .find("li:eq(" + numberIndex + ")")
            .innerHeight();
        $(".naccs ul").height(listItemHeight + "px");
    }
});

// Acc mobile
$(function () {
    let Accordion = function (el, multiple) {
        this.el = el || {};
        // more then one submenu open?
        this.multiple = multiple || false;

        let dropdownlink = this.el.find('.dropdownlink');
        dropdownlink.on('click', {
                el: this.el,
                multiple: this.multiple
            },
            this.dropdown);
    };

    Accordion.prototype.dropdown = function (e) {
        let $el = e.data.el,
            $this = $(this),
            //this is the ul.submenuItems
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            //show only one menu at the same time
            $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
        }
    };

    let accordion = new Accordion($('.accordion-menu'), false);
});


$(document).ready(function () {
    $("#home_menu,.mainScreenBtnWrap").on("click", "a", function (event) {
        event.preventDefault();
        let id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 800);
    });
});


const preventDeflinks = () => {
    const publicLinks = document.querySelectorAll('.recentPublications a');

    publicLinks.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
        });
    });

};
preventDeflinks();

const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const formContact = document.querySelector('.formContact');

    const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: red;';

    console.log(formContact);

    // валидация формы
    const formValid = () => {
        const inputName = document.querySelector('input[type=text]'),
            inputTel = document.querySelector('input[type=tel]'),
            inputText = document.querySelector('input[type=textarea]');
        
        inputName.addEventListener('input', () => {
            event.target.value = event.target.value.replace(/[^а-яa-z ]/gi, '');
        }); 

        inputText.addEventListener('input', () => {
            event.target.value = event.target.value.replace(/[^а-яa-z\.\,\d]/gi, '');
        }); 

        inputTel.addEventListener('input', () => {
            event.target.value = event.target.value.replace(/[^+\d]/g, '');
        }); 
        
    };
    formValid();

    //  form Contact
    formContact.addEventListener('submit', (event) => {
        event.preventDefault();
        formContact.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(formContact);
        let body = {};
        formData.forEach((val, key) => {
            body[key] = val;
        });

        postData(body)
            .then(successData)
            .catch(errorsData)
            .finally(finalyData(formContact));
    });

    const successData = (response) => {
        if (response.status !== 200) {
            throw new Error('status network not 200');
        }
        statusMessage.textContent = successMessage;
    };
    const errorsData = () => {
        statusMessage.textContent = errorMessage;
        console.error(error);
    };
    const finalyData = (form) => {
        form.querySelectorAll('input').forEach(item => item.value = '');

        setTimeout(()=>{
            statusMessage.textContent = '';
        }, 2000);
    };

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };
};
sendForm();