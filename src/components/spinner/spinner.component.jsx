import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

const Spinner = () => (
  <SpinnerOverlay>
    <SpinnerContainer />
  </SpinnerOverlay>
);

export default Spinner;

//This creates the spinning circle whenever you refresh the page
//This gives is a nice animation effect
//The main source is the styled component
