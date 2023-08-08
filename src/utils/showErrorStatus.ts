import { toast } from '@cincoders/cinnamon';

export function showErrorStatus(status: number): void {
  switch (status) {
    case 401:
      toast.error(
        'Credenciais inválidas, favor efetuar um novo login e tentar novamente.' +
          'Em caso de persistência do problema entre em contato com o suporte.',
        {
          position: 'top-right',
          containerId: 'page',
        },
      );
      break;
    case 403:
      toast.error(
        'Você não tem acesso a este recurso.' +
          'Se você acha que isso é um engano por favor entre em contato com o suporte.',
        {
          position: 'top-right',
          containerId: 'page',
        },
      );
      break;
    case 404:
      toast.error(
        'Recurso não encontrado, recarregue a página e tente novamente.' +
          'Em caso de persistência do problema entre em contato com o suporte.',
        {
          position: 'top-right',
          containerId: 'page',
        },
      );
      break;
    default:
      toast.error(
        'Ocorreu um erro ao processar a solicitação, recarregue a página e tente novamente.' +
          'Em caso de persistência do problema entre em contato com o suporte.',
        { position: 'top-right', containerId: 'page' },
      );
  }
}
