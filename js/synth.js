//window.AudioContext = window.AudioContext || window.webkitAudioContext;
const keyboard = new QwertyHancock({
    id: 'keyboard',
    width: 1200,
    height: 330,
    startNote: 'A2',
    whiteNotesColour: '#fff',
    blackNotesColour: '#000',
    borderColour: '#000',
    activeColour: 'red',
    octaves: 2
});

const context = new AudioContext();
masterVolume = context.createGain();
masterVolume.gain.value = 0.5;
masterVolume.connect(context.destination);

keyboard.keyDown = function (note, frequency) {
    const osc = context.createOscillator(),
    osc2 = context.createOscillator(),
    osc3 = context.createOscillator();
    
    osc.type= 'sawtooth'
    osc2.type= 'triangle'
    osc3.type= 'triangle'
    osc.frequency.value = frequency;
    osc2.frequency.value = frequency;
    osc3.frequency.value = frequency;
    
    
    osc.connect(masterVolume);
    osc2.connect(masterVolume);
    osc3.connect(masterVolume);
    
    masterVolume.connect(context.destination);
    
    osc.start(context.currentTime);
    osc2.start(context.currentTime);
    osc3.start(context.currentTime);
    oscillators[frequency] = [osc, osc2, osc3];

    osc.detune.value = -10;
    osc2.detune.value = 30;
    osc3.detune.value = 50;

    //osc.stop(context.currentTime + 0.1);
    console.log('Note', note, 'has been pressed');
    console.log('Its frequency is', frequency);
};

const oscillators = {};

 keyboard.keyUp = function (note, frequency) {
     console.log('Note', note, 'has been released');
     console.log('Its frequency was', frequency);

     
     oscillators[frequency].forEach(function (oscillator) {oscillator.stop(context.currentTime);
    });
 };