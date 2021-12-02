using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using serverDH.Dtos;
using System.Collections.Generic;

namespace serverDH.Controllers
{
    [ApiController]
    [Route("api/chat")]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<MessageHubClient, IMessageHubClient> _messageHub;
        private readonly IMessageRepo _messageRepo;

        public ChatController (IHubContext<MessageHubClient, IMessageHubClient> messageHub, IMessageRepo messageRepo)
        {
            _messageHub = messageHub;
            _messageRepo = messageRepo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<MessageDto>> GetAll()
        {

            return Ok();

        }

        [HttpPost]
        public ActionResult SendMessage(MessageDto messagedto)
        {
            return Ok();
        }
    }
}
