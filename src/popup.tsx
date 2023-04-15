import { useEffect, useState } from 'react';
import { sendToBackground } from '@plasmohq/messaging';

function IndexPopup() {
  const [data, setData] = useState<CodePracticeInfo>();

  useEffect(() => {
    async function getData() {
      const resp = await sendToBackground<undefined, CodePracticeInfo>({
        name: 'scrape'
      });
      setData(resp);
    }
    getData();
  }, [setData]);

  return (
    <div>
      {data ? JSON.stringify(data) : 'Loading...'}
    </div>
  );
}

export default IndexPopup;
