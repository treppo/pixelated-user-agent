describeComponent('page/shortcuts', function () {
  'use strict';

  describe('shortcuts', function () {
    it('triggers openComposeBox when "c" is pressed and no input is focused', function () {
      this.setupComponent();
      var eventSpy = openComposeBoxEventSpy();

      $(document).trigger(keydownEvent(this.component.characterCodes.C));

      expect(eventSpy).toHaveBeenTriggeredOn(document)
    });

    it('does not trigger openComposeBox when "c" is pressed in an input field', function () {
      this.setupComponent();
      this.$node.append('<input type="text"/>');
      var eventSpy = openComposeBoxEventSpy();

      this.$node.find('input').trigger(keydownEvent(this.component.characterCodes.C));

      expect(eventSpy).not.toHaveBeenTriggeredOn(document)
    });

    it('does not trigger openComposeBox when "c" is pressed in a textarea', function () {
      this.setupComponent();
      this.$node.append('<textarea></textarea>');
      var eventSpy = openComposeBoxEventSpy();

      this.$node.find('textarea').trigger(keydownEvent(this.component.characterCodes.C));

      expect(eventSpy).not.toHaveBeenTriggeredOn(document)
    });

    it('triggers openNoMessageSelected when <Esc> is pressed', function () {
      this.setupComponent();
      var eventSpy = spyOnEvent(document, Pixelated.events.dispatchers.rightPane.openNoMessageSelected);
      $(document).trigger(keydownEvent(this.component.characterCodes.ESC));

      expect(eventSpy).toHaveBeenTriggeredOn(document)
    });

    it('triggers ui.mail.send when <Ctrl> + <Enter> is pressed', function () {
      this.setupComponent();
      var eventSpy = spyOnEvent(document, Pixelated.events.ui.mail.send);
      $(document).trigger(jQuery.Event('keydown', {ctrlKey: true, which: this.component.characterCodes.ENTER}));
      expect(eventSpy).toHaveBeenTriggeredOn(document)
    });


    it('triggers ui.mail.send when <Cmd>/<Meta> + <Enter> is pressed', function () {
      this.setupComponent();
      var eventSpy = spyOnEvent(document, Pixelated.events.ui.mail.send);
      $(document).trigger(jQuery.Event('keydown', {metaKey: true, which: this.component.characterCodes.ENTER}));
      expect(eventSpy).toHaveBeenTriggeredOn(document)
    });

    function openComposeBoxEventSpy() {
      return spyOnEvent(document, Pixelated.events.dispatchers.rightPane.openComposeBox);
    }

    function keydownEvent(code) {
      return jQuery.Event('keydown', {which: code});
    }
  });
});
