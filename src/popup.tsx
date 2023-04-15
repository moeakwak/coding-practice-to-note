import { useEffect, useState } from 'react';
import { sendToBackground } from '@plasmohq/messaging';

function IndexPopup() {
  const [data, setData] = useState<ScrapeData>();

  useEffect(() => {
    async function getData() {
      const resp = await sendToBackground<undefined, ScrapeData>({
        name: 'scrape'
      });
      setData(resp);
    }
    getData();
  }, [setData]);

  return (
    <div>
      {data ? JSON.stringify(data, null, 2) : 'Loading...'}
    </div>
  );
}

export default IndexPopup;
