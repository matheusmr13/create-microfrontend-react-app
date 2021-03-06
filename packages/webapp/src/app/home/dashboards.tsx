import React from 'react';

import { useLoggedApiRequest } from 'base/hooks/request';

function Dashboards() {
  const [{ loading }] = useLoggedApiRequest(`/dashboards`);

  if (loading) return <div>loading</div>;

  return (
    <div>
      Home
    </div>
  );
}

export default Dashboards;
