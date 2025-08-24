import React from 'react';
import { useRouter } from 'next/router';
import Playground from '@/components/Playground';
import { getTenantConfig } from '@/lib/tenants';

export default function TenantPlaygroundPage() {
  const router = useRouter();
  const { tenant } = router.query;
  const config = getTenantConfig(typeof tenant === 'string' ? tenant : undefined);

  return <Playground tenant={config} />;
}