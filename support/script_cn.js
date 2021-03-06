// reset scroll position
window.onbeforeunload = function(){
    window.scrollTo(0,0);
}

// All the rest
document.addEventListener('DOMContentLoaded', function(){

    // Fetch and then rest the content of the logo
    var logo = document.querySelector('.logo');

    // Array contenente
    var titoli = ['软件工程师' , '学生', '创业者', '作者', '极客', '摄影师', '网页设计师', '设计师'];
    var titolo = titoli[Math.floor(Math.random()*titoli.length)];

    // Inizializzo il typewriter
    var typewriter = require('typewriter');
    var tw = typewriter(document.querySelector('.logo')).withAccuracy(100)
                                                        .withMinimumSpeed(13)
                                                        .withMaximumSpeed(18)
                                                        .build();
    // Stampo l'intro                                                    
    tw.wait(1000)
        .type('Kay - ')
        .wait(600)
        .type(' ' + titolo , function(){
            document.querySelector('body').classList.add('active');
            document.querySelector('.content').classList.add('active');
        });

});

