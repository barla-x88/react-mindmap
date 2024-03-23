import { useEffect, useState } from 'react';
import img1 from './assets/computer-mouse-laptop-yellow-background-isolated-flat-lay.jpg';
import img2 from './assets/Backspace.jpg';

const instructions = [
  {
    image: img1,
    text: 'Right Click to add node.',
  },
  {
    image: img2,
    text: 'To delete edges/nodes, click to select them first then press backspace.',
  },
];

const SplashScreen = ({ close }) => {
  const [curIns, setCurIns] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurIns((index) => {
        return index === 0 ? 1 : 0;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="splash-wrapper">
      <div className="splash">
        <div>
          <img src={instructions[curIns].image} alt="Image" />
        </div>
        <div>
          <p>{instructions[curIns].text}</p>
        </div>
        <button onClick={close}>Got It</button>
      </div>
    </div>
  );
};
export default SplashScreen;
