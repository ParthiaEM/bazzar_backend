export class CreateIdeaDto {
  ideaId: number;
  ideaField: string;
  ideaName: string;
  ideaDetail: string;
  price: number;
  isTrading: boolean;
  postedUserId: number;
  purchasedUserId: number;
  bidUserId: number;
}
