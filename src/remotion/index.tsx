import { registerRoot, Composition } from 'remotion';
import { HelloWorldComp } from './HelloWorldComp';

export const Video = () => {
  return (
    <>
      <Composition
        id="my-comp"
        component={HelloWorldComp}
        durationInFrames={120}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ text: 'World' }}
      />
    </>
  );
};

registerRoot(Video);
