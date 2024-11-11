export const expressResponseBuilder = (
  status: number = 200,
  data: any = {}
): Response =>
  ({
    status: status,
    json: jest.fn().mockResolvedValue(data),
  } as unknown as Response);
