using AutoMapper;
using serverDH.Dtos;
using serverDH.Entities;

namespace serverDH.Map
{
    public class ChatMappingProfile : Profile
    {
        public ChatMappingProfile()
        {
            CreateMap<Message, MessageDto>()
                .ForMember(m => m.date, d => d.MapFrom(s => s.date))
                .ForMember(m => m.UserName, d => d.MapFrom(s => s.UserName))
                .ForMember(m => m.message, d => d.MapFrom(s => s.message));

            CreateMap<NewMessageDto, Message>()
               .ForMember(e => e.UserName, c => c.MapFrom( g=> g.username))
               .ForMember(e => e.date, c => c.MapFrom(g => g.date))
               .ForMember(e => e.message, c => c.MapFrom(g => g.message));
        }
    }
}
