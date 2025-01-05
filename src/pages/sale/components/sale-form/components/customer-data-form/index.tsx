import { Grid } from '@/components/grid';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Address } from '@/types/common';

interface CustomerDataFormProps {
  address?: Address;
}

export const CustomerDataForm = ({
  address = {
    city: '',
    neighborhood: '',
    number: '',
    state: '',
    street: '',
    zipCode: '',
  },
}: CustomerDataFormProps) => {
  return (
    <Grid>
      <div>
        <Label>CEP</Label>
        <Input disabled value={address?.zipCode} />
      </div>
      <div>
        <Label>Rua</Label>
        <Input disabled value={address?.street} />
      </div>
      <div>
        <Label>Bairro</Label>
        <Input disabled value={address?.neighborhood} />
      </div>
      <div>
        <Label>Cidade</Label>
        <Input disabled value={address?.city} />
      </div>
      <div>
        <Label>Estado</Label>
        <Input disabled value={address?.state} />
      </div>
      <div>
        <Label>Numero</Label>
        <Input disabled value={address?.number} />
      </div>
    </Grid>
  );
};
