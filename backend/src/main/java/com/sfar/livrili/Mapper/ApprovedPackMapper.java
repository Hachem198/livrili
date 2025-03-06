package com.sfar.livrili.Mapper;


import com.sfar.livrili.Domains.Dto.ApprovedPackDto;
import com.sfar.livrili.Domains.Dto.DeliverGuyPackOfferDto.OfferResDto;
import com.sfar.livrili.Domains.Entities.Offer;
import com.sfar.livrili.Domains.Entities.OfferStatus;
import com.sfar.livrili.Domains.Entities.Pack;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class ApprovedPackMapper {
    private final OfferForDeliveryGuyMapper offerForDeliveryGuyMapper ;

    public ApprovedPackDto toApprovedPackDto(Pack pack) {
        if(pack == null) {
            log.error("Pack is null");
            throw new RuntimeException("Pack is null");
        }
        Offer acceptedOffer = pack.getOffers().stream().filter(offer -> offer.getStatus() == OfferStatus.ACCEPTED).findFirst().get();
        OfferResDto offerResDto = offerForDeliveryGuyMapper.toOfferResDto(acceptedOffer);
        return ApprovedPackDto.builder()
                .packDescription(pack.getDescription())
                .packId(pack.getId())
                .offer(offerResDto)
                .packStatus(pack.getStatus())
                .packCreationDate(pack.getCreatedAt())
                .clientName(pack.getClient().getFirstName()+" "+pack.getClient().getLastName())
                .packWeight(pack.getWeight())
                .deliveryGuyName(acceptedOffer.getDeliveryPerson().getFirstName() +" " +acceptedOffer.getDeliveryPerson().getLastName())
                .clientPhone(pack.getClient().getPhone())
                .deliveryGuyPhone(acceptedOffer.getDeliveryPerson().getPhone())
                .packStatus(pack.getStatus())
                .packPickUpLocation(pack.getPickUpLocation())
                .packDropOffLocation(pack.getDropOffLocation())
                .build();


    }
}
