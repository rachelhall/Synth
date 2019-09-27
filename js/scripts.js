var midi, data;
// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

    var inputs = midi.inputs.values();
    var outputs = midiAccess.outputs;
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message) {
    data = message.data; // this gives us our [command/channel, note, velocity] data.
    console.log('MIDI data', data); // MIDI data [144, 63, 73]
    data = event.data,
    cmd = data[0] >>4,
    channel = data[0] & 0xf,
    type = data[0] & 0xf0,
    note = data[1],
    velocity = data[2];

    // One-liner to resume playback when user interacted with the page.
    document.querySelector('button').addEventListener('click', function() {
        context.resume().then(() => {
        console.log('Playback resumed successfully');
    });
  });

  var context = new AudioContext(),
  oscillators = {};
  

if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess()
      .then(success, failure);
}

function success (midi) {
  var inputs = midi.inputs.values();
  // inputs is an Iterator

  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      // each time there is a midi message call the onMIDIMessage function
      input.value.onmidimessage = onMIDIMessage;
  }
}

function failure () {
  console.error('No access to your midi devices.')
}

function onMIDIMessage (message) {
  var frequency = midiNoteToFrequency(message.data[1]);

  if (message.data[0] === 144 && message.data[2] > 0) {
      playNote(frequency);
  }

  if (message.data[0] === 128 || message.data[2] === 0) {
      stopNote(frequency);
  }
}

function midiNoteToFrequency (note) {
  return Math.pow(2, ((note - 69) / 12)) * 440;
}

function playNote (frequency) {
  oscillators[frequency] = context.createOscillator();
  oscillators[frequency].frequency.value = frequency;
  oscillators[frequency].connect(context.destination);
  oscillators[frequency].start(context.currentTime);
}

function stopNote (frequency) {
  oscillators[frequency].stop(context.currentTime);
  oscillators[frequency].disconnect();
}
  
    const noteHeading = document.querySelector('.noteHeading');
    
    function displayNote(note){
            noteHeading.innerHTML=note;
        }
        console.log(noteHeading)
        displayNote(note);
    




    function player(){
        
    }

    function noteOn(midiNote, velocity){
        player(midiNote, velocity);

    }

    function noteOff(midiNote, velocity) {
        player(midiNote, velocity);

    }

    switch (type) {
        case 144: //noteOn message
            noteOn(note, velocity);
            break;
        case 128: //noteOff message
        noteOff(note, velocity);
        break;    
    }
}

function frequencyFromNoteNumber(note) {
    return 440 * Math.pow(2, (note -69) / 12 );
}



