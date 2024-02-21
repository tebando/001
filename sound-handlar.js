// soundhandler.js

AFRAME.registerComponent('soundhandler', {
    tick: function () {
        var entity = document.querySelector('[sound]');
        if (document.querySelector('a-marker').object3D.visible === true) {
            console.log()
            if(document.getElementById('voice').style.display !== 'none'){
                entity.components.sound.playSound();
            }
        } else {
            entity.components.sound.pauseSound();
        }

    }
});