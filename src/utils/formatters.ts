export const formatDate = (str: string) => new Date(str).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
export const formatCoins = (n: number) => `${n.toLocaleString()} coins`;
export const formatPoints = (n: number) => `${n.toLocaleString()} pts`;
export const formatSeats = (capacity: number, count: number) => { const left = capacity - count; return left === 0 ? 'Full' : `${left} seat${left !== 1 ? 's' : ''} left`; };
export const formatDisplayName = (name: string) => { 
  if (!name) return 'User';
  const p = name.split(' '); 
  return p[0] + (p[1] ? ' ' + p[1][0] + '.' : ''); 
};
export const formatPhone = (phone: string) => phone.startsWith('+') ? phone : `+${phone}`;
