import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config/dist";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DbReportsModule } from "./db-reports/db-reports.module";

import { MongooseModule } from "@nestjs/mongoose";
import { PurchasesModule } from "./purchases/purchases.module";

import { RequestsCreditsModule } from "./requests-credits/requests-credits.module";
import { CashierOrdersModule } from './cashier-orders/cashier-orders.module';
import { AccountingEntriesModule } from './accounting-entries/accounting-entries.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      //envFilePath: `${process.cwd()}\\.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log(
          configService.get("MSSQL_PRENDARSA_HOST") +
            "\\" +
            configService.get("MSSQL_PRENDARSA_INSTANCE")
        );
        return {
          type: "mssql",
          options: {
            encrypt: false,
            readOnlyIntent: true, //Only read data
          },
          //logger: "debug",
          autoLoadEntities: true,
          logging: ["query", "error"],
          host:
            configService.get("MSSQL_PRENDARSA_HOST") +
            "\\" +
            configService.get("MSSQL_PRENDARSA_INSTANCE"),
          port: parseInt(configService.get("MSSQL_PRENDARSA_PORT"), 10),
          username: configService.get("MSSQL_PRENDARSA_USER"),
          password: configService.get("MSSQL_PRENDARSA_PASSW"),
          database: configService.get("MSSQL_PRENDARSA_DB"),
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: "files",
      useFactory: async (configService: ConfigService) => {
        return {
          type: "mssql",
          options: {
            encrypt: false,
            readOnlyIntent: true, //Only read data
          },
          autoLoadEntities: true,
          logging: ["query", "error"],
          host: configService.get("MSSQL_FILES_HOST"),
          port: parseInt(configService.get("MSSQL_FILES_PORT"), 10),
          username: configService.get("MSSQL_FILES_USER"),
          password: configService.get("MSSQL_FILES_PASSW"),
          database: configService.get("MSSQL_FILES_DB"),
        };
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get("MONGODB_URI"),
        };
      },
    }),

    DbReportsModule,

    PurchasesModule,

    RequestsCreditsModule,

    CashierOrdersModule,

    AccountingEntriesModule,
  ],
})
export class AppModule {}
