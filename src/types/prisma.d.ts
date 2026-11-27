declare module "@prisma/client" {
  export class PrismaClient {
    constructor(options?: any);
    user: any;
    college: any;
    enquiry: any;
    application: any;
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
  }
}
