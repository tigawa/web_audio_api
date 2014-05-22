var context;
var soundBuffer = {};

window.addEventListener('load', init, false);
function init() {
    try {
        context = new webkitAudioContext();
        /* key_down */
        loadDogSound('key_down', "audio/key_down.mp3");
        loadDogSound('enter', "audio/enter.mp3");
        loadDogSound('back_space', "audio/back_space.mp3");
        loadDogSound('tab', "audio/tab.mp3");
        loadDogSound('0', "audio/ppush0.mp3");
        loadDogSound('1', "audio/ppush1.mp3");
        loadDogSound('2', "audio/ppush2.mp3");
        loadDogSound('3', "audio/ppush3.mp3");
        loadDogSound('4', "audio/ppush4.mp3");
        loadDogSound('5', "audio/ppush5.mp3");
        loadDogSound('6', "audio/ppush6.mp3");
        loadDogSound('7', "audio/ppush7.mp3");
        loadDogSound('8', "audio/ppush8.mp3");
        loadDogSound('9', "audio/ppush9.mp3");
        /* mouse */
        loadDogSound('mouse_click', "audio/mouse_click.mp3");
        loadDogSound('mouse_dblclick', "audio/mouse_dblclick.mp3");
        loadDogSound('button_click', "audio/button_click.wav");

        /* keybrodを押した時の処理 */
        document.addEventListener("keydown", 
            function(ev){
                if ( ev.keyCode == 13 )
                    playSound(soundBuffer.enter);
                else if ( ev.keyCode == 8 || ev.keyCode == 46 )
                    playSound(soundBuffer.back_space);
                else if ( ev.keyCode == 9 )
                    playSound(soundBuffer.tab);
                else if ( ev.keyCode >= 48 && ev.keyCode <=57 )
                    playSound(soundBuffer[(ev.keyCode-48)]);
                else
                    playSound(soundBuffer.key_down);
            }, false);

        /* マウス操作の処理 */
        document.addEventListener("mousedown",
            function(ev){
                if(ev.target.getElementsByTagName = "BUTION")
                    playSound(soundBuffer.mouse_click);
                else
                    playSound(soundBuffer.button_click);
            }, false);

    } catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
}

function loadDogSound(key, url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
    context.decodeAudioData(request.response,
                            /* デコードが完了したときに実行される処理 */
                            function(buffer) { soundBuffer[key] = buffer;},
                            /* デコードが失敗したときに実行される処理 */
                            function(){alert("error")});
    }
    request.send();
}

function playSound(buffer) {
    var source = context.createBufferSource(); // creates a sound source
    source.buffer = buffer;                    // tell the source which sound to play
    source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    source.noteOn(0);                          // play the source now
}
