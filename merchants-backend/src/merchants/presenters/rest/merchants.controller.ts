import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  Query,
  Logger,
  Inject,
} from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { MerchantsService } from '@merchants/application/merchants.service';
import { Merchant } from '@merchants/domain/entities/merchant';
import { APISuccessfulResponse } from '@common/infrastructure/interfaces/api-response.interface';
import { SUCCESSFULL_RESPONSE_MESSAGE } from '@common/infrastructure/constants/api-messages';
import { PaginationDto } from './dto/pagination.dto';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { ParseMongoIdPipe } from '@common/presenters/pipes/parse-mongo-id.pipe';

@Controller('merchants')
export class MerchantsController {
  private readonly logger = new Logger(MerchantsController.name);

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly merchantsService: MerchantsService,
  ) {}

  @Get()
  async findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<APISuccessfulResponse<Merchant[]>> {
    const traceId: string = this.request.app.locals.config.traceId;

    this.logger.log('Request to findAll merchants', { traceId });

    const merchants = await this.merchantsService.findAll(paginationDto);

    this.logger.log('Merchants retrieved successfully', { traceId });

    const response: APISuccessfulResponse<Merchant[]> = Builder<
      APISuccessfulResponse<Merchant[]>
    >()
      .traceId(traceId)
      .message(SUCCESSFULL_RESPONSE_MESSAGE)
      .data(merchants)
      .build();

    return response;
  }

  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string) {
    const traceId: string = this.request.app.locals.config.traceId;

    this.logger.log(`Request to findOne with id ${id}`, { traceId });

    const merchant = await this.merchantsService.findOneById(id);

    const response: APISuccessfulResponse<Merchant> = Builder<
      APISuccessfulResponse<Merchant>
    >()
      .traceId(traceId)
      .message(SUCCESSFULL_RESPONSE_MESSAGE)
      .data(merchant)
      .build();

    this.logger.log(
      `Merchant retrieved successfully: ${JSON.stringify(response)}`,
      { traceId },
    );

    return response;
  }

  @Post()
  async create(@Body() createMerchantDto: CreateMerchantDto) {
    const traceId: string = this.request.app.locals.config.traceId;

    this.logger.log(
      `Request to create merchant: ${JSON.stringify(createMerchantDto)}`,
      { traceId },
    );

    const createdMerchant =
      await this.merchantsService.create(createMerchantDto);

    const response: APISuccessfulResponse<Merchant> = Builder<
      APISuccessfulResponse<Merchant>
    >()
      .traceId(traceId)
      .message(SUCCESSFULL_RESPONSE_MESSAGE)
      .data(createdMerchant)
      .build();

    this.logger.log(
      `Merchant created successfully: ${JSON.stringify(response)}`,
      { traceId },
    );

    return response;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    const traceId: string = this.request.app.locals.config.traceId;

    this.logger.log(
      `Request to update merchant with id ${id}: ${JSON.stringify(updateMerchantDto)}`,
      { traceId },
    );

    const merchantToUpdate = Builder<Merchant>()
      .name(updateMerchantDto.name)
      .email(updateMerchantDto.email)
      .logoUrl(updateMerchantDto.logoUrl)
      .sector(updateMerchantDto.sector)
      .address(updateMerchantDto.address)
      .build();

    const updatedMerchant = await this.merchantsService.update(
      id,
      merchantToUpdate,
    );

    const response: APISuccessfulResponse<Merchant> = Builder<
      APISuccessfulResponse<Merchant>
    >()
      .traceId(traceId)
      .message(SUCCESSFULL_RESPONSE_MESSAGE)
      .data(updatedMerchant)
      .build();

    this.logger.log(
      `Merchant updated successfully: ${JSON.stringify(response)}`,
      { traceId },
    );

    return response;
  }

  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    const traceId: string = this.request.app.locals.config.traceId;

    this.logger.log(`Request to delete merchant with id ${id}`, { traceId });

    const deletedMerchant = await this.merchantsService.delete(id);

    const response: APISuccessfulResponse<Merchant> = Builder<
      APISuccessfulResponse<Merchant>
    >()
      .traceId(traceId)
      .message(SUCCESSFULL_RESPONSE_MESSAGE)
      .data(deletedMerchant)
      .build();

    this.logger.log(
      `Merchant deleted successfully: ${JSON.stringify(response)}`,
      { traceId },
    );

    return response;
  }
}
