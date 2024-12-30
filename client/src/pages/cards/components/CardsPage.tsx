import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '@/hooks';
import { getLanguagesOptions } from '@/api';

function CardsPage() {
  const apiClient = useApiClient();
  const { data } = useQuery(getLanguagesOptions({}, apiClient));
  return (
    <>
      <div>Cards Page</div>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}

export default CardsPage;
