import { Player } from '@remotion/player';
import { Button } from 'antd';
import { HelloWorldComp } from '../../remotion/HelloWorldComp';
import { MovieInput } from './MovieInput';

export function Video() {
  const download = async () => {
    await window.electron.downloadRemotionVideo();
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <MovieInput />
        <h1>Hello Vidéo</h1>
        <p>Voici un example de vidéo en utilisant remotion.</p>
        <p>La vidéo est téléchargeable en cliquant sur le bouton suivant :</p>
        <Button onClick={download}>Télécharger</Button>
      </div>
      <div
        style={{
          flex: 1,
        }}
      >
        <Player
          component={HelloWorldComp}
          inputProps={{ text: 'World' }}
          durationInFrames={120}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={30}
          style={{
            width: '100%',
            height: '100%',
          }}
          controls
        />
      </div>
    </div>
  );
}
