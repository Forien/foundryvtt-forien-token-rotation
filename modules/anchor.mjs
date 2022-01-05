export default class DragAnchor {

  constructor(token) {
    this.token = canvas.tokens.get(token._id);
  }

  render() {
    return `<div id="rotate-anchor-box">
        <div id="rotate-anchor-handle" class="rotation-handle" draggable="true">⟳</div>
     </div>`
  }

  initialize(html, angle) {
    let box = $(html).find('#rotate-anchor-box')[0];
    angle = this.degToRad(angle);

    let pos = {
      x: parseFloat(box.getAttribute('data-x')) || 0,
      y: parseFloat(box.getAttribute('data-y')) || 0
    };
    box.style.transform = 'translate(' + pos.x + 'px, ' + pos.y + 'px) rotate(' + angle + 'rad' + ')';
    box.setAttribute('data-angle', angle);
  }

  activateListeners(html) {
    html.on("dragstart", '.rotation-handle', (event) => {
      let box = event.target.parentElement;
      let rect = box.getBoundingClientRect();

      // store the center as the element has css `transform-origin: center center`
      box.setAttribute('data-center-x', rect.left + rect.width / 2);
      box.setAttribute('data-center-y', rect.top + rect.height / 2);
      // get the angle of the element when the drag starts
      box.setAttribute('data-angle', this.getDragAngle(event));
    });

    html.on("dragend", '.rotation-handle', (event) => {
      let box = event.target.parentElement;
      let angle = this.getDragAngle(event);

      // save the angle on dragend
      box.setAttribute('data-angle', angle);
      this.updateToken(angle);
    });

    html.on("drag", '.rotation-handle', (event) => {
      let box = event.target.parentElement;

      let pos = {
        x: parseFloat(box.getAttribute('data-x')) || 0,
        y: parseFloat(box.getAttribute('data-y')) || 0
      };

      let angle = this.getDragAngle(event);

      // update transform style on dragmove
      box.style.transform = 'translate(' + pos.x + 'px, ' + pos.y + 'px) rotate(' + angle + 'rad' + ')';
    });
  }

  getDragAngle(event) {
    let box = event.target.parentElement;
    let startAngle = parseFloat(box.getAttribute('data-angle')) || 0;
    let center = {
      x: parseFloat(box.getAttribute('data-center-x')) || 0,
      y: parseFloat(box.getAttribute('data-center-y')) || 0
    };
    let angle = Math.atan2(center.y - event.clientY,
      center.x - event.clientX);

    return angle - startAngle;
  }

  async updateToken(angleRad) {
    let angleDeg = this.radToDeg(angleRad);

    return this.token.document.update({rotation: angleDeg});
  }

  degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }

  radToDeg(radians) {
    return radians * (180 / Math.PI);
  }
}
