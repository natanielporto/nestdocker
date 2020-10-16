import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { CreateClientsInput } from './dto/create-clients.input';
import { Clients } from './clients.entity';
import { ClientsService } from './clients.service';
import { UpdateClientsInput } from './dto/update-clients.input';

@Resolver('Clients')
export class ClientsResolver {
  constructor(private clientsService: ClientsService) {}

  @Query(() => [Clients])
  async clients(): Promise<Clients[]> {
    const clients = await this.clientsService.findAllClients();
    return clients;
  }

  @Query(() => Clients)
  async client(@Args('id') id: string): Promise<Clients> {
    const client = await this.clientsService.findClientsById(id);
    return client;
  }

  @Mutation(() => Clients)
  async createClients(
    @Args('data') data: CreateClientsInput,
  ): Promise<Clients> {
    const client = await this.clientsService.createClients(data);
    return client;
  }

  @Mutation(() => Clients)
  async updateClients(
    @Args('id') id: string,
    @Args('data') data: UpdateClientsInput,
  ): Promise<Clients> {
    const client = await this.clientsService.updateClients(id, data);
    return client;
  }

  @Mutation(() => Boolean)
  async deleteClients(@Args('id') id: string): Promise<boolean> {
    const deleted = await this.clientsService.deleteClients(id);
    return deleted;
  }
}
