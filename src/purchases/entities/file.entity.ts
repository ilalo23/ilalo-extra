import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("ArchivosComprobantes")
export class File {
  @PrimaryColumn({ select: false })
  id: number;

  @Column({ name: "archivo" })
  data: string;
}
