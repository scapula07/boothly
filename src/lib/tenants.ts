export type TenantId = 'boothly' | 'acme' | 'contoso';

export type TenantConfig = {
	id: TenantId;
	name: string;
	logoSrc?: string;
	primaryColor: string; // hex
	accentColor: string; // hex
	gradientFrom: string; // hex
	gradientTo: string; // hex
	ctaText: string;
};

const TENANTS: Record<TenantId, TenantConfig> = {
	boothly: {
		id: 'boothly',
		name: 'Boothly',
		logoSrc: '/favicon.ico',
		primaryColor: '#040D34',
		accentColor: '#891F0C',
		gradientFrom: '#891F0C',
		gradientTo: '#040D34',
		ctaText: "Launch Booth",
	},
	acme: {
		id: 'acme',
		name: 'ACME Events',
		logoSrc: '/next.svg',
		primaryColor: '#0F172A',
		accentColor: '#22C55E',
		gradientFrom: '#0EA5E9',
		gradientTo: '#0F172A',
		ctaText: 'Start Capture',
	},
	contoso: {
		id: 'contoso',
		name: 'Contoso Live',
		logoSrc: '/vercel.svg',
		primaryColor: '#111827',
		accentColor: '#8B5CF6',
		gradientFrom: '#111827',
		gradientTo: '#8B5CF6',
		ctaText: 'Create Clip',
	},
};

export function getTenantConfig(tenantId?: string): TenantConfig {
	const key = (tenantId || 'boothly').toLowerCase() as TenantId;
	if (key in TENANTS) return TENANTS[key];
	return TENANTS.boothly;
}