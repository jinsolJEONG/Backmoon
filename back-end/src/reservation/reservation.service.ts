import { Injectable, NotFoundException } from '@nestjs/common';
import { Dog } from 'src/dogs/entities/dogs.entity';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDogDto } from 'src/dogs/DTO/create.dog.dto';
import { UpdateDogDto } from 'src/dogs/DTO/update.dog.dto';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './DTO/create.reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async getReservedTimeByDate(date: Date): Promise<any> {
    if (!this.isValidDate(date)) {
      date = new Date();
    }
    console.log(date);
    const StartDay = new Date(date);
    StartDay.setHours(0, 0, 0, 0);

    const EndDay = new Date(date);
    EndDay.setHours(23, 59, 59, 999);

    const VisitReservations = await this.reservationRepository.find({
      where: {
        ReservationDatetime: Between(StartDay, EndDay),
        Type: 'visit',
      },
    });
    const PlayReservations = await this.reservationRepository.find({
      where: {
        ReservationDatetime: Between(StartDay, EndDay),
        Type: 'play',
      },
    });

    const VisitReservedTimes = VisitReservations.map((reservation) => {
      return reservation.ReservationDatetime.getHours().toString();
    });
    let VisitResult = [];
    for (let i = 9; i <= 17; i++) {
      if (!VisitReservedTimes.includes(i.toString())) {
        VisitResult.push(`${i.toString()} : false`);
      } else {
        VisitResult.push(`${i.toString()} : true`);
      }
    }
    const PlayReservedTimes = PlayReservations.map((reservation) => {
      return reservation.ReservationDatetime.getHours().toString();
    });
    let PlayResult = [];
    for (let i = 9; i <= 17; i++) {
      if (!PlayReservedTimes.includes(i.toString())) {
        PlayResult.push(`${i.toString()} : false`);
      } else {
        PlayResult.push(`${i.toString()} : true`);
      }
    }
    const Result = {
      'type: visit': VisitResult,
      'type: play': PlayResult,
    };

    return Result;
  }
  isValidDate(date: Date): boolean {
    return !isNaN(date.getTime());
  }
  async deleteOne(ID: number) {
    return await this.reservationRepository.delete({ ReservationID: ID });
  }
  async getByDogID(id: number) {
    const reservations = await this.reservationRepository.find({
      where: { DogID: id },
    });

    return reservations.map((reservation) => {
      reservation.ReservationDatetime.setHours(
        reservation.ReservationDatetime.getHours() + 9,
      );
      return reservation; // 수정된 reservation 객체를 반환합니다.
    });
  }

  async createReservation(reservationData: CreateReservationDto) {
    return await this.reservationRepository.save(reservationData);
  }
  async getByUserID(sequence: number) {
    const reservations = await this.reservationRepository.find({
      where: { seq: sequence },
    });

    return reservations.map((reservation) => {
      reservation.ReservationDatetime.setHours(
        reservation.ReservationDatetime.getHours() + 9,
      );
      return reservation; // 수정된 reservation 객체를 반환합니다.
    });
  }

  //   async getAllLostDogs( ):Promise<any>{
  //     const dogs = (await this.dogsRepository.find({where:{Status:"Lost"}})).reverse();
  //     return dogs;
  //   }
  //   async getAllLostDogsCount(){
  //     const count = this.dogsRepository.count({where:{Status:"Lost"}});
  //     return count;
  //   }
  //   async getOneLostDog(DogID: number): Promise<Dog> {
  //     const LostDog = this.dogsRepository.findOneBy({Status:"Lost", DogID: DogID})
  //     return LostDog;
  //   }
  //   async deleteOne(DogID: number): Promise<void> {
  //     this.getOneLostDog(DogID);
  //     this.dogsRepository.delete(DogID);
  //   }

  //   async create(dogData : CreateDogDto): Promise<void> {
  //     dogData.Status = "Lost";
  //     await this.dogsRepository.save(dogData);
  //   }

  //   async update(DogID: number, updateData: UpdateDogDto): Promise<void> {
  //     this.getOneLostDog(DogID);
  //     await this.dogsRepository.update(DogID, updateData);
  //   }
}
