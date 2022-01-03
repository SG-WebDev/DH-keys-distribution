using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using serverDH.Dtos;
using serverDH.Entities;
using System.Collections.Generic;
using System.Linq;

namespace serverDH.Controllers
{
    [ApiController]
    [Route("api/chat")]

    public class ChatController : ControllerBase
    {

        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHubContext<MessageHubClient, IMessageHubClient> _messageHub;


        public ChatController(AppDbContext dbContext, IMapper mapper, IHubContext<MessageHubClient, IMessageHubClient> messageHub)
        {

            _dbContext = dbContext;
            _mapper = mapper;
            _messageHub = messageHub;
        }
        [HttpGet]
        public ActionResult<IEnumerable<MessageDto>> GetAll()
        {
            var result = _dbContext.message.Include(x => x.User).ToList().OrderBy(messtime => messtime.date);
            var resultdto = _mapper.Map<List<MessageDto>>(result);

            return Ok(resultdto);

        }


        [HttpPost]
        public ActionResult SendMessage(NewMessageDto messagedto)
        {
            var result = _mapper.Map<Message>(messagedto);
            if (result == null) { return BadRequest("Message can not be NULL!!"); }
            _dbContext.message.Add(result);
            _dbContext.SaveChanges();

            _messageHub.Clients.All.NewMessage().Wait();
            return Ok();
        }
    }
}
