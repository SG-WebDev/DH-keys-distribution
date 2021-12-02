using System.Threading.Tasks;

namespace serverDH
{
    public interface IMessageHubClient
    {
        Task NewMessage();

    }
}
