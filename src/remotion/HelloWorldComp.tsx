type HelloWorldCompProps = { text: string };

export function HelloWorldComp({ text }: HelloWorldCompProps) {
  return (
    <div
      style={{
        backgroundColor: 'lightblue',
        width: '1920px',
        height: '1080px',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontSize: '5em',
        }}
      >
        Hello {text}!
      </span>
    </div>
  );
}
