export const getStatusType = (status: string): 'success' | 'warning' | 'error' | 'default' => {
  const lowercaseStatus = status.toLowerCase();
  
  if (['active', 'approved', 'paid', 'present'].includes(lowercaseStatus)) {
    return 'success';
  }
  if (['pending', 'processing'].includes(lowercaseStatus)) {
    return 'warning';
  }
  if (['rejected', 'inactive', 'absent'].includes(lowercaseStatus)) {
    return 'error';
  }
  return 'default';
};