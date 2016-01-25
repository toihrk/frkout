// File Select Knob
//// Cmd+Tab (Shift)
if (ch == 'b1' && num == '54') {
  var _cmd_tab = 'tell application "System Events" to  key code 48 using {command down}';
  var _cmd_tab_shift = 'tell application "System Events" to key code 48 using {command down, shift down}';

  if (val == '0')  { appleScript(_cmd_tab); }
  if (val == '7f') { appleScript(_cmd_tab_shift); }
}

// LoopCut Knob(DeckA)
//// Scroll Up/Down
if (ch == 'b1' && num == '55') {
  var _scroll_down = 'tell application "System Events" to key code 121';
  var _scroll_up      = 'tell application "System Events" to key code 116';

  if (val == '0')  { appleScript(_scroll_down); }
  if (val == '7f') { appleScript(_scroll_up); }
}

// LoopCut Knob(DeckB)
//// Zoom Up/Down
if (ch == 'b1' && num == '5a') {
  var _zoom_up = 'tell application "System Events" to key code 69 using { command down }'
  var _zoom_down = 'tell application "System Events" to key code 78 using { command down }'

  if(val == '0')  { appleScript(_zoom_up); }
  if(val == '7f') { appleScript(_zoom_down); }
}

// Cue1~5(DeckA)
//// Application Shortcuts
if (ch == '91' && val == '40'){
  if (num == '17') { appleScript('tell application "Safari" to activate'); }
  if (num == '18') { appleScript('tell application "Google Chrome" to activate'); }
  if (num == '19') { appleScript('tell application "Atom" to activate'); }
  if (num == '20') { appleScript('tell application "iTerm" to activate'); }
  if (num == '21') { appleScript('tell application "Slack" to activate'); }
}
