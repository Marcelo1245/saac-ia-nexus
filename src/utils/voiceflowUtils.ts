
export const loadVoiceflowWidget = () => {
  // Create a unique script ID for this component
  const scriptId = 'voiceflow-script-how-it-works';
  
  // Remove any existing script to avoid conflicts
  const existingScript = document.getElementById(scriptId);
  if (existingScript) {
    existingScript.remove();
  }
  
  // Create and load the script
  const script = document.createElement('script');
  script.id = scriptId;
  script.type = 'text/javascript';
  script.onload = () => {
    console.log('Voiceflow script loaded in HowItWorksSection');
    // @ts-ignore
    if (window.voiceflow?.chat) {
      // @ts-ignore
      window.voiceflow.chat.load({
        verify: { projectID: '67d04783ad9ed2f668b04618' },
        url: 'https://general-runtime.voiceflow.com/',
        versionID: 'production',
        voice: {
          url: "https://runtime-api.voiceflow.com/"
        },
        render: {
          mode: 'overlay'
        }
      });
    }
  };
  script.onerror = () => {
    console.error('Failed to load Voiceflow script');
  };
  script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
  document.head.appendChild(script);
};
