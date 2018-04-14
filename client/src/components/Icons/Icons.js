import React from "react";

const icons = {
    'my-post': 'M9 7h15M9 10h11M9 12h9M9 16h9M9 18h13M9 22h10.5M9 24h14M9 27h12',
    'new-post': 'M16.2 19.3l-4.8 1.3 1.2-4.8L27 1.3s2.5 1 3.5 3.5L16.2 19.3',
  };
  
  const Icon = props => (
    <svg width="24" height="24" viewBox="0 0 1024 1024">
      <path d={icons[props.icon]}></path>
    </svg>
  );

export default Icon;