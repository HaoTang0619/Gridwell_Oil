// Normal modal
document.write(`
  <div class="modal_group" id="modal">
    <div aria-hidden="true" class="modal_container">
      <div class="modal_box" id = "modal_box"></div>
      <div aria-hidden="true" class="modal_backdrop" onclick="closeModal()"></div>
    </div>
  </div>
`);

// Cancel / Submit
document.write(`
  <div class="modal_group" id="check">
    <div aria-hidden="true" class="modal_container control_check">
      <div class="modal_box control_check_box" id = "check_box"></div>
      <div aria-hidden="true" class="modal_backdrop" id="check_backdrop" onclick="closeCheck()"></div>
    </div>
  </div>
`);
