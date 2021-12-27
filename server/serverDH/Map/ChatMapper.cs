using AutoMapper;
using serverDH.Dtos;
using serverDH.Entities;

namespace serverDH.Map
{
    public class ChatMapper: Profile
    {
        public ChatMapper()
        {
            CreateMap<Message, MessageDto>()
                .ForMember(m => m.date, d => d.MapFrom(s => s.When))
                .ForMember(m => m.UserID, d => d.MapFrom(s => s.user.Id))
                .ForMember(m => m.UserName, d => d.MapFrom(s => s.user.UserName))
                .ForMember(m => m.message, d => d.MapFrom(s => s.Content));

            CreateMap<NewMessageDto, Message>()
                .ForMember(e => e.UserId, c => c.MapFrom(g => g.UserID))
                .ForMember(e => e.When, c => c.MapFrom(g => g.date))
                .ForMember(e => e.Content, c => c.MapFrom(g => g.message));
        }
    }
}
