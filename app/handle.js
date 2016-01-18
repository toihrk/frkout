var ipc = require("electron").ipcRenderer

var debug   = false;
var note    = null;
var handle  = null;
var midi    = null;
var inputs  = [];
var outputs = [];
var debug   = false;

function debugCheck(checkbox){
  debug = checkbox.checked;
}

function loadHandle(){
  handle = localStorage['handle'];
  document.querySelector('.js-code').value  = handle;
}

function storeHandle(){
  var code = document.querySelector('.js-code').value;
  localStorage['handle'] = code;
  loadHandle();
  alert('saved!');
}

function onMIDISuccess(m){
  midi = m;

  var m_in = midi.inputs.values();
  for(var i = m_in.next(); !i.done; i = m_in.next()){
    inputs.push(i.value);
  }

  var m_out = midi.outputs.values();
  for(var o = m_out.next(); !o.done; o = m_out.next()){
    outputs.push(o.value);
  }

  for(var cnt = 0; cnt < inputs.length; cnt++){
    console.log(inputs[cnt]);
    document.querySelector('.js-devices').value += inputs[cnt].name + " ";

    inputs[cnt].onmidimessage = onMIDIEvent;
  }
}

function onMIDIFailure(msg){
  console.log("MIDIAccessFailure:" + msg);
}

function appleScript(script){
  console.log(script);
  ipc.send('appleScript', script);
}

ipc.on('appleScriptError', function(event, arg){
  console.log('APPLESCRIPT ERROR: ' + arg);
});
ipc.on('appleScriptSuccess', function(event, arg){
  console.log('APPLESCRIPT SUCCESS: ' + arg);
})

function onMIDIEvent(e){
  if(inputs.length > 0){
    console.log(e);
    if(debug){ document.querySelector('.js-debug').value = '[' + e.data.join(',') + ']'; }
    loadHandle();
    eval(handle.replace(/\r?\n/g, ''));
  }
}

function requestMIDIAccess(){
  document.querySelector('.js-devices').value = "";
  loadHandle();
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}

requestMIDIAccess()
