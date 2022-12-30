// init handlers
let layoutHandler = null;

const initHandlers = () => {
  layoutHandler = new LayoutHandler();
};

// Init handlers using jQuery
// (($) => {
//   $(document).ready(() => {
//     initHandlers();
//   });
// })(jQuery);


// Init handlers using Vanilla
document.addEventListener('DOMContentLoaded', () => { initHandlers(); });

