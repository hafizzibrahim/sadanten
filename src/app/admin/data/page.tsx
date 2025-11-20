import EnsiklopediaService from '../../../services/EnsiklopediaService';
import DataClient from '../../../components/admin/DataClient';

export default async function DataManagementPage() {
  // Fetch data on the server
  const data = await EnsiklopediaService.getAllEnsiklopedia();

  return <DataClient data={data} />;
}